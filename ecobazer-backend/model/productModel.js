const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
{
  title:{
    type:String,
    unique:true,
    required:true,
    trim:true
  },

  description:{
    type:String,
    default:""
  },

  shortDescription:{
    type:String,
    required:true
  },

  price:{
    type:Number,
    required:true,
    min:0
  },

  discountPrice:{
    type:Number,
    default:0,
    min:0
  },

  sku:{
    type:String,
    required:true,
    unique:true
  },

  stock:{
    type:Number,
    required:true,
    default:0
  },

  brand:{
    type:String,
    default:""
  },

  category:{
    type:String,
    required:true
  },

  subCategory:{
    type:String,
    default:""
  },

  additionalInformation:{
    type:String,
    default:""
  },

  tag:[
    {
      type:String
    }
  ],

  status:{
    type:String,
    enum:[
      "pending",
      "active",
      "inactive"
    ],
    default:"active"
  },

  images:[
    {
      url:{
        type:String,
        required:true
      },

      isMain:{
        type:Boolean,
        default:false
      }
    }
  ]

},
{
 timestamps:true
});


module.exports = mongoose.model(
"Product",
productSchema
);