const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')
const { createError, STATUS_FORBIDDEN, STATUS_NOT_AUTHORIZED } = require('../../utils')

exports.IsAuthenticated = class IsAuthenticated extends SchemaDirectiveVisitor {
    visitObject() { }
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = (...args) => {
            if (!args[2].req.user)
                throw createError({ msg: STATUS_FORBIDDEN })
            return resolve.apply(this, args)
        }
    }
}

exports.IsAuthorized = class IsAuthorized extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type)
        type._requiredAuthRole = this.args.requires
    }
    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType)
        field._requiredAuthRole = this.args.requires
    }
    ensureFieldsWrapped(objectType) {
        if (objectType._authFieldsWrapped) return
        objectType._authFieldsWrapped = true
        const fields = objectType.getFields()
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName]
            const { resolve = defaultFieldResolver } = field
            field.resolve = (...args) => {
                const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole
                if (!requiredRole) return resolve.apply(this, args)
                const { user } = args[2].req
                if (!user) throw createError({ msg: STATUS_FORBIDDEN })
                if (!user.permissions.some(permission => requiredRole.includes(permission))) throw createError({ msg: STATUS_NOT_AUTHORIZED })
                return resolve.apply(this, args)
            }
        })
    }
}
