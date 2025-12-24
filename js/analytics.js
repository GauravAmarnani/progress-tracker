const progress = getProgress();
const topicTotals = {};

studyData.topics.forEach(topic => {
  let total = 0;
  topic.subtopics.forEach(sub =>
    sub.items.forEach(item => {
      if (progress[item.id]) total += item.minutes;
    })
  );
  topicTotals[topic.name] = total;
});

// BAR CHART
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: Object.keys(topicTotals),
    datasets: [{
      label: "Minutes Completed",
      data: Object.values(topicTotals),
      backgroundColor: "#2563eb"
    }]
  },
  options: { responsive: true }
});

// PIE CHART
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: Object.keys(topicTotals),
    datasets: [{
      data: Object.values(topicTotals)
    }]
  },
  options: { responsive: true }
});

// CSV EXPORT
document.getElementById("exportCsv").onclick = () => {
  let csv = "Topic,Minutes Completed\n";
  Object.entries(topicTotals).forEach(([t, m]) => {
    csv += `${t},${m}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "study-analytics.csv";
  a.click();
};
