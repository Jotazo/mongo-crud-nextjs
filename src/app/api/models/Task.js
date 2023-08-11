import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
      // validate: {
      //   validator: function (v) {
      //     console.log("v :>> ", v);
      //     return v.length > 0;
      //   },
      //   message: () => "Titulo req",
      // },
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default models.Task || model("Task", taskSchema);
