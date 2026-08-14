const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

const client = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 10000,
});

/**
 * GET /api/items — query: category, type, district, status, ownerTelegramId (hammasi optional)
 */
async function getItems(params = {}) {
  const res = await client.get('/items', { params });
  return res.data;
}

/**
 * POST /api/items — body: title, description, category, type, ownerName,
 * ownerContact, district, imageUrl?, ownerTelegramId?
 */
async function createItem(data) {
  const res = await client.post('/items', data);
  return res.data;
}

/**
 * GET /api/points — query: district, type (optional)
 */
async function getPoints(params = {}) {
  const res = await client.get('/points', { params });
  return res.data;
}

module.exports = {
  getItems,
  createItem,
  getPoints,
};
