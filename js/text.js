// Turns case text into HTML. The markup is small on purpose:
//   a blank line starts a new paragraph
//   lines starting with "> " are a document: a log, a letter, a receipt, set in typewriter type
//   *italic*, **bold**, {det} is "Detective <your name>", {name} is just your name

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// The name goes in last, and through a function, so it's always just text: a $ or a * in it stays as typed.
function inline(s, who) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\{det\}/g, () => esc(`Detective ${who}`))
    .replace(/\{name\}/g, () => esc(who));
}

export function toHTML(text, who = 'Novak') {
  const blocks = String(text || '').replace(/\r/g, '').trim().split(/\n\s*\n/);
  return blocks.map(b => {
    const lines = b.split('\n').map(l => l.trim());
    if (lines.every(l => l.startsWith('>'))) {
      return `<div class="doc">${lines.map(l => inline(l.replace(/^>\s?/, ''), who) || '&nbsp;').join('<br>')}</div>`;
    }
    return `<p>${inline(lines.join(' '), who)}</p>`;
  }).join('');
}

// Plain text with the markup stripped, for places like aria labels.
export function toPlain(text, who = 'Novak') {
  return String(text || '')
    .replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\{det\}/g, () => `Detective ${who}`).replace(/\{name\}/g, () => who)
    .replace(/\s+/g, ' ').trim();
}
