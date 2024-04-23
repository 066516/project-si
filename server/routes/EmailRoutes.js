const express = require("express");
const router = express.Router();
const transporter = require("../controls/Email"); // Assuming this file exports your transporter instance
const path = require("path");
const Achat = require("../modles/Achat");
const Fournisseur = require("../modles/Fournisseur");
const Product = require("../modles/product");
const Vente = require("../modles/Vente");
const Client = require("../modles/client");
router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const filePath = path.join(__dirname, "..", "tp3.pdf");
  const htmlContent = `
  <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 10px;">
  <h1 style="color: #333;">Hello sir! 😊</h1>
  <p style="color: #555;">This is the rapport system. I'm sorry for the late dispatch.</p>
  <h3 style="color: #333; padding: 10px; text-align: start;  text-transform: uppercase;">Best Regards.</h3>
  </div>

`;

  //  const too=`<h1>${to}</h1>`
  const mailOptions = {
    from: "ghmamnbyl@gmail.com",
    to: to,
    subject,
    html: htmlContent,
    attachments: [
      {
        filename: "tp3.pdf", // change the filename as needed
        path: filePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
router.post("/sendAchat", async (req, res) => {
  const { to, id } = req.body;
  // const filePath = path.join(__dirname, "..", "tp3.pdf");
  try {
    const achat = await Achat.findOne({ id_achat: id });

    const fournisseur = await Fournisseur.findOne({
      Id_fournisseur: achat.id_fournisseur,
    });
    const product = await Product.findOne({ productId: achat.id_produit });
    // Combine achat and fournisseur data as needed
    // Note: This approach does not automatically merge the fournisseur data into the achat object

    // Further processing with achat

    const htmlContent = `
  <div style="position: relative; border-radius: 20px;padding: 8px; background-color: rgba(59, 130, 246, 0.8); width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: start;">
  <div style=" width: 100%;  color: white; position: relative; top: 3px; padding: 5px; border-radius: 10px;  height: 90%;">
    <h1 style="font-size: 1.125rem; font-weight: 600;text-align: center; margin-bottom: 16px; text-transform: uppercase;">print achat</h1>
    <div style="text-transform: uppercase;">
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">fournisseur</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
   ${fournisseur.Nom_fournisseur}  ${fournisseur.Prenom_fournisseur}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">product</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${product.name} - ${product.categoryId}
        </div>
      </div>
      
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">STATUT PAIEMENT</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${achat.statut_paiement_achat ? "Totalment" : "parsilment"}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">COUNT</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
  ${achat.quantite_achat}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">DATE ACHAT</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
         ${achat.date_achat}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">MONTANT TOTAL</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
          ${achat.montant_total_achat}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">RESTE</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${achat.reste}
        </div>
      </div>
      <!-- Additional fields here -->
     
    </div>
  </div>
</div>


`;

    //  const too=`<h1>${to}</h1>`
    const mailOptions = {
      from: "countalit@gmail.com",
      to: to,
      subject: "print achat",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.log(err);
    // Error handling
    res.status(500).json({ error: "Failed to send email" });
  }
});
router.post("/sendvente", async (req, res) => {
  const { to, id } = req.body;
  // const filePath = path.join(__dirname, "..", "tp3.pdf");
  try {
    const vente = await Vente.findOne({ id_vente: id });

    const client = await Client.findOne({
      clientId: vente.id_client,
    });
    const product = await Product.findOne({ productId: vente.id_produit });
    // Combine vente and cleint data as needed
    // Note: This approach does not automatically merge the cleint data into the vente object

    // Further processing with vente

    const htmlContent = `
  <div style="position: relative; border-radius: 20px;padding: 8px; background-color: rgba(59, 130, 246, 0.8); width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: start;">
  <div style=" width: 100%;  color: white; position: relative; top: 3px; padding: 5px; border-radius: 10px;  height: 90%;">
    <h1 style="font-size: 1.125rem; font-weight: 600;text-align: center; margin-bottom: 16px; text-transform: uppercase;">print vente</h1>
    <div style="text-transform: uppercase;">
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">client</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
   ${client.nomClient}  ${client.prenomClient}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">product</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${product.name} - ${product.categoryId}
        </div>
      </div>
      
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">STATUT PAIEMENT</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${vente.statut_paiement_vente ? "Totalment" : "parsilment"}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">COUNT</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
  ${vente.quantite_vendue}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">DATE vente</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
         ${vente.date_vente}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">MONTANT TOTAL</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
          ${vente.montant_total_vente}
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label for="name" style="display: block; margin-bottom: 8px;">RESTE</label>
        <div style="border: 1px solid #D1D5DB; border-radius: 4px; padding: 8px; width: 100%;">
        ${vente.reste}
        </div>
      </div>
      <!-- Additional fields here -->
     
    </div>
  </div>
</div>


`;

    //  const too=`<h1>${to}</h1>`
    const mailOptions = {
      from: "countalit@gmail.com",
      to: to,
      subject: "print vente",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.log(err);
    // Error handling
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
