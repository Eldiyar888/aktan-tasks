const getUserGroups = () => {
    const userGroups = [
        {
            id: 1,
            name: 'Друзья',
            users: [
                { id: 1, name: 'Anna' },
                { id: 3, name: 'Bob' },
                { id: 4, name: 'V' },
            ],
        },
        {
            id: 2,
            name: 'Коллеги',
            users: [
                { id: 7, name: 'Alex' },
                { id: 10, name: 'Max' },
                { id: 11, name: 'X' },
                { id: 14, name: 'Steve' },
                { id: 77, name: 'Lisa' },
                { id: 78, name: 'Mike' },
                { id: 81, name: 'Sam' },
                { id: 89, name: 'John' },
            ],
        },
    ];

    return new Promise((resolve) => {
        setTimeout(() => resolve(userGroups), 300);
    });
};

const getNumberByUserId = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(id ** 2), 300);
    });
};


const getUsers = async () => {
    let req1 = getUserGroups();
    let res = await req1.then((userGroup) => {
        let users = [];
        for(let i = 0; i < userGroup.length; i++) {
            for(let j = 0; j < userGroup[i].users.length; j++) {
                users.push(userGroup[i].users[j]);
            }
        }
        return users;
    })
    .then(async(data) => {
        let listOfSecretNumber = [];
        for(let i = 0; i < data.length; i++) {
          await getNumberByUserId(data[i].id).then((id) => {
           listOfSecretNumber.push(id);
          })
       }

       for(let i = 0; i < data.length; i++) {
            data[i].secretNumber = listOfSecretNumber[i];
       }
       return data.filter(item => item.secretNumber % 2 == 1)
    })

    return res;
}

getUsers().then(res => console.log(res))
