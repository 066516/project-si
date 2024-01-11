const Client = require("../modles/client"); // Adjust the path as necessary

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res
      .status(200)
      .send({ message: "Client created successfully", data: newClient });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get a single client by ID
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findOne({ clientId: req.params.id });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ id_shop: req.params.id, trash: false });
    res.status(200).send(clients);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findOneAndUpdate(
      { clientId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).send({ message: "Client not found" });
    }
    res
      .status(200)
      .send({ message: "Client updated successfully", data: updatedClient });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOne({
      clientId: req.params.id,
      trash: false,
    });
    client.trash = true;
    client.save();

    if (!client) {
      return res.status(404).send({ message: "Client not found !!!!!" });
    }
    res.status(200).send({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
