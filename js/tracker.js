function render() {
  const progress = getProgress();
  const container = document.getElementById("tracker");
  container.innerHTML = "";

  studyData.topics.forEach(topic => {
    let topicMinutes = 0;

    let html = `<section class="card">
      <h2>${topic.name}</h2>`;

    topic.subtopics.forEach(sub => {
      html += `<h3>${sub.name}</h3><ul>`;

      sub.items.forEach(item => {
        const done = progress[item.id];
        if (done) topicMinutes += item.minutes;

        html += `
          <li class="item ${done ? "done" : ""}"
              onclick="toggle('${item.id}')">
            ${item.name} — ${item.minutes} min
          </li>`;
      });

      html += `</ul>`;
    });

    html += `<p><strong>Total Completed:</strong> ${topicMinutes} min</p></section>`;
    container.innerHTML += html;
  });
}

function toggle(id) {
  toggleItem(id);
  render();
}

render();
