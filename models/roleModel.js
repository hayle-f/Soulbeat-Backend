import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true })

const RoleModel = mongoose.model('Role', roleSchema, 'roles')

export default RoleModel
