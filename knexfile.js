'use strict';

module.exports = {
  development: {client: 'pg', connection: 'postgres://localhost:5432/bookshelf_dev'},

  test: {client: 'pg', connection: 'postgres://localhost:5432/bookshelf_test'},

  production: {}
};
