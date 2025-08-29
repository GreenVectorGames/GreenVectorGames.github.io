async function loadData() {
  const res = await fetch("data.json");
  const data = await res.json();

  const brand = document.querySelector(".brand");
  brand.innerHTML = `<span class="brand-logo">${data.company.logo}</span> ${data.company.name}`;

  document.querySelector("section#games h2").textContent = data.sections.games;
  document.querySelector("section#upcoming h2").textContent = data.sections.upcoming;

  const gamesList = document.getElementById("gamesList");
  const upcomingList = document.getElementById("upcomingList");
  gamesList.innerHTML = "";
  upcomingList.innerHTML = "";

  const today = new Date();

  const releasedGames = data.games
    .filter(game => new Date(game.release) <= today)
    .sort((a, b) => new Date(b.release) - new Date(a.release));

  const upcomingGames = data.games
    .filter(game => new Date(game.release) > today)
    .sort((a, b) => new Date(a.release) - new Date(b.release));

  releasedGames.forEach(game => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${game.slug}/" class="game-card" style="background-image: url('${game.image}')">
        <div class="overlay"></div>
        <div class="content">
          <h3>${game.title}</h3>
          <p>${game.short}</p>
          <p><strong>Release:</strong> ${game.release}</p>
        </div>
      </a>
    `;
    gamesList.appendChild(li);
  });

  upcomingGames.forEach(game => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${game.slug}/" class="game-card" style="background-image: url('${game.image}')">
        <div class="overlay"></div>
        <div class="content">
          <h3>${game.title}</h3>
          <p>${game.short}</p>
          <p><strong>Release:</strong> ${game.release}</p>
        </div>
      </a>
    `;
    upcomingList.appendChild(li);
  });
}

loadData();
