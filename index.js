const fs = require('fs');

// 파일이 존재하는지 먼저 확인
if (!fs.existsSync('sourceFile.txt')) {
    console.error('sourceFile.txt 파일이 존재하지 않습니다.');
    process.exit(1);  // 프로그램 종료
}

console.log('파일 복사를 시작합니다...');

const source = fs.createReadStream('sourceFile.txt');
const destination = fs.createWriteStream('destinationFile.txt');

let totalBytes = 0;

source.pipe(destination);

source.on('data', (chunk) => {
    totalBytes += chunk.length;
    console.log(`복사된 데이터 크기: ${totalBytes} bytes.`);
});

source.on('end', () => {
    console.log('파일 복사가 완료되었습니다.');
});

source.on('error', (err) => {
    console.error('읽기 오류 발생:', err);
});

destination.on('error', (err) => {
    console.error('쓰기 오류 발생:', err);
});
