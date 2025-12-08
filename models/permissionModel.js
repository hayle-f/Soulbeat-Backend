import mongoose from 'mongoose'

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const PermissionModel = mongoose.model('Permission', permissionSchema, 'permissions')

export default PermissionModel
