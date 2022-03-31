const btnRegister = document.querySelector('#btn-to-register');
const btnLogin = document.querySelector('#btn-to-login');
const formRegister = document.querySelector('#form-register');
const formLogin = document.querySelector('#form-login');
const sectionLogin = document.querySelector('.main-login');
const openSide = document.querySelector('.open-side');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('#content');

document.addEventListener('click', (e) => {
    const element = e.target
    
    if (element === btnRegister) {
        formLogin.classList.toggle('none');
        formRegister.classList.toggle('none');
    };

    if (element === btnLogin) {
        formLogin.classList.toggle('none');
        formRegister.classList.toggle('none');
    };

    if(element === openSide) {
        sidebar.classList.toggle('opacity0');
        sidebar.classList.toggle('reduce');
        content.classList.toggle('mobileContent');
    }
})

formRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    const instace = new ValidaForm(formRegister);
    if (instace.error.length === 0) {
        formLogin.classList.toggle('none');
        formRegister.classList.toggle('none');
        localStorage.setItem('users', JSON.stringify(instace.info));
    }
})

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    const instace = new ValidaForm(formLogin)
    if(instace.error.length === 0) {
        const user = JSON.parse(localStorage.getItem('users'));
        if(!user) {
            const email = formLogin.querySelector('.email');
            email.insertAdjacentHTML('afterend', '<span class="error-text">Por favor crie uma conta</span>');
            return
        }
        if (user.email !== instace.info.email) {
            email.insertAdjacentHTML('afterend', '<span class="error-text">Email incorreto</span>')
            return
        }
        if (user.password !== instace.info.password) {
            const password = formLogin.querySelector('.password');
            password.insertAdjacentHTML('afterend', '<span class="error-text">Senha incorreta</span>')
            return
        }
        sectionLogin.classList.toggle('none');
        sidebar.parentNode.classList.toggle('none');
    }
})

class ValidaForm {
    constructor (form) {
        this.form = form;
        this.error = [];
        this.info = {};
        this.validate()
    };

    selectInputs() {
        this.inputs = this.form.querySelectorAll('input');
    }

    clearError() {
        const error = this.form.querySelectorAll('.error-text');
        if (error) {
            for (let i of error) i.remove()
        }
    }

    checkInputs() {
        this.clearError()
        this.selectInputs()
        for (let i of this.inputs) {
            if (i.classList.contains('name') || i.classList.contains('password')){
                if (i.value.length < 4 ) {
                    this.error.push('error');
                    i.insertAdjacentHTML('afterend', '<span class="error-text">Este campo precisa ter no minimo 4 caracteres</span>')
                };
            }
        
            if (i.classList.contains('email')){
                if(i.value.length < 10) {
                    this.error.push('error');
                    i.insertAdjacentHTML('afterend', '<span class="error-text">Email invalido</span>')
                };
            };   
        };
    };

    validate() {
        this.checkInputs()
        if (this.error.length === 0) {
            for (let i of this.inputs) {
                if(i.classList.contains('name')) {
                    this.info.name = i.value;
                };
                if(i.classList.contains('email')) {
                    this.info.email = i.value;
                };
                if(i.classList.contains('password')) {
                    this.info.password = i.value;
                };
            }
        }
    };

    
};
 

