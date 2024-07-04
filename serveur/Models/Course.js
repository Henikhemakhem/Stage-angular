  // Models/course.js
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  // Définir le schéma pour le modèle Course
  const CourseSchema = new Schema({
    formation: { type: Schema.Types.ObjectId, ref: 'Formation', required: true }, // Référence vers Formation
    nom: {  type: String, required: true  },
    videos: [{ url: String, public_id: String }], // Liste de vidéos hébergées sur Cloudinary
    explication: { type: String, required: true },
    pdf: {  type: String, required: true  },
  });

  // Créer le modèle Course basé sur le schéma
  const Course = mongoose.model('Course', CourseSchema);

  module.exports = Course;
