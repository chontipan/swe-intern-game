/**
 * SE Intern Sim — research log receiver (Google Apps Script)
 * 1) สร้าง Google Sheet ใหม่ > Extensions > Apps Script > วางไฟล์นี้
 * 2) Deploy > New deployment > Web app
 *    Execute as: Me · Who has access: Anyone
 * 3) คัดลอก URL (…/exec) ไปใส่ RESEARCH_ENDPOINT ใน index.html
 */
const COLUMNS = [
  'ts', 'session_id', 'pid', 'group', 'run_no', 'role', 'company', 'event',
  'week', 'choice_idx', 'choice_text', 'decision_ms', 'sent_back',
  'before_skill', 'before_energy', 'before_sanity', 'before_karma', 'before_money',
  'after_skill', 'after_energy', 'after_sanity', 'after_karma', 'after_money',
  'ending_code', 'career_choice', 'user_agent'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const row = JSON.parse(e.postData.contents);
    sheet.appendRow(COLUMNS.map(c => (row[c] === undefined ? '' : row[c])));
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('log');
  if (!sh) {
    sh = ss.insertSheet('log');
    sh.appendRow(COLUMNS);
    sh.setFrozenRows(1);
  }
  return sh;
}
