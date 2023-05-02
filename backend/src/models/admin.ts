const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['association', 'gym', 'personal trainer'],
            required: true
        },
        permissions: {
            type: [
              {
                permission: {
                  type: String,
                  enum: ['manage_athletes', 'approve_coaches', 'oversee_system'],
                },
                value: {
                  type: Boolean,
                  default: false
                }
              }
            ],
            default: [
              {
                permission: 'manage_athletes',
                value: false
              },
              {
                permission: 'approve_coaches',
                value: false
              },
              {
                permission: 'oversee_system',
                value: false
              }
            ],
            select: false//to prevent showing permissions, it is accessibke only with populate
          }
              
            
});

export const AdminModel = mongoose.model("Admin",AdminSchema)

