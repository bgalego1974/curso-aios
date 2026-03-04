/**
 * Task Manager — Entry Point
 * Demonstração do projecto-exemplo do Curso AIOS.
 */

const { createTask, listTasks, completeTask, getStats } = require('./tasks');
const { formatTaskLine, formatStats } = require('./utils');

console.log('📋 Task Manager — AIOS Sandbox\n');

// Criar tarefas de exemplo
createTask('Instalar o AIOS', 'npx aios-core install');
createTask('Correr aios doctor', 'Verificar que tudo funciona');
createTask('Criar primeiro epic', 'Usar @pm *create-epic');
createTask('Implementar feature', 'Usar @dev *develop');
createTask('Correr QA gate', 'Usar @qa *qa-gate');

// Completar algumas
completeTask(1);
completeTask(2);

// Listar
console.log('Tarefas:');
listTasks().forEach((task) => {
  console.log(`  ${formatTaskLine(task)}`);
});

console.log(`\n${formatStats(getStats())}`);
console.log('\n✅ Sandbox funcional — pronto para praticar AIOS!');
