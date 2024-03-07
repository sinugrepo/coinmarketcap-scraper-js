const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// Contoh kode sederhana
const edusafety = require('edusafety-api');
function greet(name) {
    return "Hello, " + name + "!";
}

module.exports = greet;

const simpleProject = require('simple-project-edusafety');
function simpleProjects(name) {
    return "Hello, " + name + "!";
}

module.exports = simpleProjects;

// Endpoint untuk melakukan scraping data
app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://coinmarketcap.com/';

    // Lakukan permintaan GET ke halaman CoinMarketCap
    const response = await axios.get(url);

    // Load konten halaman menggunakan Cheerio
    const $ = cheerio.load(response.data);

    // Dapatkan data yang diperlukan dari halaman
    const coins = [];
    $('.cmc-table-row').each((index, element) => {
      const rank = $(element).find('.cmc-table__cell--sort-by__rank').text().trim();
      const name = $(element).find('.cmc-table__cell--sort-by__name a').text().trim();
      const price = $(element).find('.cmc-table__cell--sort-by__price').text().trim();
      coins.push({ rank, name, price });
    });

    res.json(coins);
  } catch (error) {
    console.error('Error scraping CoinMarketCap:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});