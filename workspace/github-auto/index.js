const fs = require('fs');
const path = require('path');
const { createPublicRepository, createPrivateRepository } = require('./create');

const createRepository = async (args) => {
  const name = args.name;
  const isPrivate = args.private;
  const description = args.description || '';

  if (isPrivate) {
    await createPrivateRepository(name, description);
  } else {
    await createPublicRepository(name, description);
  }
};

module.exports = createRepository;