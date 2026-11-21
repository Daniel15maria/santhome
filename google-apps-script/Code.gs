/**
 * Santhome Alumni public directory endpoint.
 * The linked sheet should have Name and Batch/year in columns A and B.
 * Only alumni who opted in should be appended by the website.
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    if (!sheet) throw new Error('Sheet1 was not found.');

    const rows = sheet.getDataRange().getValues();
    const data = rows.slice(1)
      .filter((row) => row[0])
      .map((row) => ({ name: String(row[0]).trim(), batchYear: row[1] ? String(row[1]).trim() : '' }));
    const result = JSON.stringify({ status: 'success', data: data });
    const callback = e && e.parameter && e.parameter.callback;

    // JSONP lets the static GitHub Pages website read the public directory.
    if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService.createTextOutput(callback + '(' + result + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    const result = JSON.stringify({ status: 'error', message: String(error) });
    const callback = e && e.parameter && e.parameter.callback;
    if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService.createTextOutput(callback + '(' + result + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    const name = String(params.name || '').trim();
    const batchYear = String(params.batchYear || params.batch_year || '').trim();
    const publicConsent = String(params.publicConsent || '').toLowerCase() === 'yes';

    if (!name || !batchYear || !publicConsent) {
      throw new Error('Name, batch/year, and public listing consent are required.');
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    if (!sheet) throw new Error('Sheet1 was not found.');
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([name, batchYear]);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
