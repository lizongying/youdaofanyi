import '../css/content.css';

window.onload = () => {
    const remove = (item) => {
        const self = document.querySelector(item);
        self.style.display = 'none';
    };

    const add = (item) => {
        const self = document.querySelector(item);
        switch (item) {
            case '.nav-con': {
                self.style.display = 'block';
                break;
            }
            case '#docOriginal': {
                self.style.display = 'inline-block';
                break;
            }
            case '.doc__language--to': {
                self.style.display = 'block';
                break;
            }
        }
    };

    window.show = false;
    document.querySelector('.customer_service').onclick = function () {
        if (!window.show) {
            ['.nav-con', '#docOriginal', '.doc__language--to'].forEach((item) => {
                remove(item);
            });
            window.show = true;
            document.querySelector('#docTranslation').style.width = '100%';
        } else {
            ['.nav-con', '#docOriginal', '.doc__language--to'].forEach((item) => {
                add(item);
            });
            window.show = false;
            document.querySelector('#docTranslation').style.width = '636px';
        }
    };

    const exportDoc = () => {
        const doc = document.querySelector('#exportDoc');
        if (doc) {
            const ul = document.querySelector('#navList ul');
            const li = document.createElement('li');
            li.style.cursor = 'pointer';
            const a = document.createElement('a');
            a.innerText = '导出翻译文档';
            li.appendChild(a);
            ul.insertBefore(li, ul.childNodes[0]);
            clearInterval(intervalExport);
            a.onclick = function () {
                const content = document.querySelector('#docTranslationText').innerHTML;
                const blob = new Blob([content], {type: 'application/text/html'});
                a.href = URL.createObjectURL(blob);
                a.download = new Date().getTime() + '.html';
                a.target = '_blank';
                URL.revokeObjectURL(blob);
                a.click();
            }
        }
    };

    const intervalExport = setInterval(exportDoc, 100);
};
