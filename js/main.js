
let actualDisplayedUsers;
fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        const users = data.map(user => ({
            username: user.username,
            name: user.name,
            email: user.email
        }));

        sortAscending(users);    
        renderList(users);
        addFilterFun(users);
        addSortingFun();
    })
    .catch(err =>{
        console.log(err);
    });

const renderList = (users) => {
    const $userList = document.getElementById('user-list');
    $userList.innerHTML = "";
    users.forEach(user => {
        const el = 
        `<div class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${user.username}</h5>
            </div>
            <p class="mb-1">${user.name}</p>
            <small>${user.email}</small>
        </div>`;
        $userList.innerHTML += el;
    });
    actualDisplayedUsers = users;
};

const search = (allUsers, searchUser) => {
    const filteredUsers = allUsers.filter(el => el.username.toLowerCase().includes(searchUser.toLowerCase()));
    renderList(filteredUsers);
};

const addFilterFun = (users) => {
    document.getElementById('users-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const searchUser = form.get('searchUser');
        if (!searchUser) {
            renderList(users);
            return;
        }
        search(users, searchUser);
    });
};

const addSortingFun = () => {
    document.getElementById('sort-select').addEventListener('change', (e) => {
        switch (e.target.value){
            case "descending": 
                sortDescending(actualDisplayedUsers);
            break;
            case "ascending":
                sortAscending(actualDisplayedUsers);
            break;
        };
        renderList(actualDisplayedUsers);
    })
};
//sortowanie rosnąco
const sortAscending = (users) => {
    return users.sort((userA, userB) => {
        if (userA.username >= userB.username)
            return 1;
        else return -1;
    });
};

//sortowanie malejąco
const sortDescending = (users) => {
    return users.sort((userA, userB) => {
        if (userA.username <= userB.username)
            return 1;
        else return -1;
    });
};