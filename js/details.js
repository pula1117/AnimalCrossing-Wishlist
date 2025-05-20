const apiKey = '2cb526da-fa3e-4a24-b550-6aad92eb0c02'; 
const villagerName = 'Apollo';

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

    document.getElementById('villager.name').textContent = data.name || 'N/A';
    document.getElementById('villager.species').textContent = data.species || 'N/A';
    document.getElementById('villager.birthday').textContent = data['birthday-string'] || 'N/A';
    document.getElementById('villager.quote').textContent = data.quote || 'N/A';
    document.getElementById('villager.personality').textContent = data.personality || 'N/A';

  } catch (error) {
    console.error('Error fetching villager data:', error);

    // Datos de respaldo si falla la API
    document.getElementById('name').textContent = 'Apollo';
    document.getElementById('species').textContent = 'Eagle';
    document.getElementById('birthday').textContent = '04/07';
    document.getElementById('quote').textContent = '"What goes up must come down."';
    document.getElementById('personality').textContent = 'Cranky';
  }
}

fetchVillager();