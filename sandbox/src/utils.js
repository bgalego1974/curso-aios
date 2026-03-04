/**
 * Utilitários do Task Manager.
 */

function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTaskLine(task) {
  const status = task.completed ? '✅' : '⬜';
  const date = formatDate(task.createdAt);
  return `${status} [${task.id}] ${task.title} (${date})`;
}

function formatStats(stats) {
  return `Total: ${stats.total} | Concluídas: ${stats.completed} | Pendentes: ${stats.pending}`;
}

module.exports = {
  formatDate,
  formatTaskLine,
  formatStats,
};
