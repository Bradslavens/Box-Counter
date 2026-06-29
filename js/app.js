export async function initApp(db) {
  const totalEl = document.getElementById('total');
  const incrementBtn = document.getElementById('increment');

  const count = await db.getCount();
  totalEl.textContent = String(count);

  incrementBtn.addEventListener('click', async () => {
    const next = await db.incrementCount();
    totalEl.textContent = String(next);
  });
}
