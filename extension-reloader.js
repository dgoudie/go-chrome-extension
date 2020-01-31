const fs = require('fs');
const open = require('open');
const { Subject } = require('rxjs');
const { debounceTime, tap } = require('rxjs/operators');

const subject = new Subject();

subject
    .pipe(
        debounceTime(100),
        tap(() => console.log('Reloading Extension...'))
    )
    .subscribe(() => open('http://reload.extensions'));

if (!fs.existsSync('./dist/src')) {
    fs.mkdirSync('./dist/src');
}

fs.watch('./dist/src', { recursive: true }, (event, filename) =>
    subject.next()
);
