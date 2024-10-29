// 1
function* fibonacci() {
    let num1 = 0;
    let num2 = 1;
    while (true) {
        yield num1;
        let temp = num1;
        num1 = num2;
        num2 = temp + num2;
    }
}

const fib = fibonacci();

for (let i = 0; i < 10; i++) {
    console.log(fib.next().value);
}

// 2

async function* fetchUsers(userIds) {
    for (const userId of userIds) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка при получении пользователя с id ${userId}`);
        }
        
        const user = await response.json();
        yield user;
    }
}

const userIds = [1, 2, 3];

(async () => {
    const userGenerator = fetchUsers(userIds);

    for await (const user of userGenerator) {
        console.log(user);
    }
})();


// 3


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function* lazyLoadImages(imageArray) {
    for (const image of imageArray) {
        await delay(1000);
        yield `Загружено: ${image}`;
    }
}
const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

(async () => {
    const imageLoader = lazyLoadImages(images);
    
    for await (const message of imageLoader) {
        console.log(message);
    }
})();


// 4

function* readFiles(fileNames) {
    for (const fileName of fileNames) {
        yield fileName;
    }
}

const files = ["file1.txt", "file2.txt", "file3.txt"];
const fileGenerator = readFiles(files);

for (const fileName of fileGenerator) {
    console.log(fileName);
}


// 5
async function* delayedCounter(max, delay) {
    for (let i = 1; i <= max; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
        yield i;
    }
}

(async () => {
    const max = 5;
    const delay = 500;
    const numberGenerator = delayedCounter(max, delay);

    for await (const number of numberGenerator) {
        console.log(number);
    }
})();


// 6
async function* checkServerStatus() {
    while (true) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        const status = data.completed ? "OK" : "NOT OK";
        yield status;
        if (status === "OK") {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

(async () => {
    const statusGenerator = checkServerStatus();

    for await (const status of statusGenerator) {
        console.log(status);
    }
})();