async function loadQuestions() {
  const res = await fetch("/api/questions");
  const data = await res.json();

  const container = document.getElementById("questions");
  container.innerHTML = "";

  data.forEach(q => {
    container.innerHTML += `
      <div class="question">
        <h3>${q.title}</h3>
        <p>${q.content}</p>
        <p class="category">Категория: ${q.category}</p>
        <button onclick="like(${q.id})">👍 ${q.likes}</button>
      </div>
    `;
  });
}

async function addQuestion() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const category = document.getElementById("category").value;

  await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, category })
  });

  loadQuestions();
}

async function like(id) {
  await fetch(`/api/like/${id}`, { method: "POST" });
  loadQuestions();
}

loadQuestions();
