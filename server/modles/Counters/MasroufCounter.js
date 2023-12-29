const Masrouf = require("./models/Masrouf");

const createMasrouf = async (employeId, montant) => {
  const newMasrouf = new Masrouf({
    id_employe: employeId,
    montant_masrouf: montant,
  });
  await newMasrouf.save();
  console.log("New Masrouf record created with ID:", newMasrouf.id_masrouf);
};

createMasrouf("employeObjectId", 100.0); // Replace 'employeObjectId' and amount as needed
