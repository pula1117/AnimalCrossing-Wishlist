const apiKey = '2cb526da-fa3e-4a24-b550-6aad92eb0c02'; 
const villagerName = 'Julia';

async function fetchVillager() {
  try {
    const response = await fetch(`https://api.nookipedia.com/villagers/${encodeURIComponent(villagerName)}`, {
      headers: {
        'X-API-KEY': apiKey,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    document.getElementById('name').textContent = data.name || 'N/A';
    document.getElementById('species').textContent = data.species || 'N/A';
    document.getElementById('birthday').textContent = data['birthday-string'] || 'N/A';
    document.getElementById('quote').textContent = data.quote || 'N/A';
    document.getElementById('personality').textContent = data.personality || 'N/A';

  } catch (error) {
    console.error('Error fetching villager data:', error);

    document.getElementById('name').textContent = 'Julia';
    document.getElementById('species').textContent = 'Ostrich';
    document.getElementById('birthday').textContent = '31/07';
    document.getElementById('quote').textContent = '"Cut once, measure twice... Wait— reverse that."';
    document.getElementById('personality').textContent = 'Snooty';
  }
}

// Ejecutar la función al cargar el script
fetchVillager();