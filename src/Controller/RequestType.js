const {
    getRequestList,
    addRequestService,
    updateRequestService,
    deleteRequestService,
  } = require("../Service/requestSevice");

  const getUserById = async (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

const createUser = async (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    users = users.filter(u => u.id !== userId);
    res.status(204).send();
};