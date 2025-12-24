function render() {
  const progress = getProgress();
  const container = document.getElementById("tracker");
  container.innerHTML = "";

  studyData.topics.forEach(topic => {
    let topicMinutes = 0;

    const card = document.createElement("section");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = topic.name;
    card.appendChild(h2);

    topic.subtopics.forEach(sub => {
      const h3 = document.createElement("h3");
      h3.textContent = sub.name;
      card.appendChild(h3);

      const ul = document.createElement("ul");

      sub.items.forEach(item => {
        const done = progress[item.id];
        if (done) topicMinutes += item.minutes;

        const li = document.createElement("li");
        li.className = "item" + (done ? " done" : "");
        li.textContent = `${item.name} — ${item.minutes} min`;

        li.addEventListener("click", () => {
          toggleItem(item.id);
          render();
        });

        ul.appendChild(li);
      });

      card.appendChild(ul);
    });

    const total = document.createElement("p");
    total.innerHTML = `<strong>Total Completed:</strong> ${topicMinutes} min`;
    card.appendChild(total);

    container.appendChild(card);
  });
}

render();
