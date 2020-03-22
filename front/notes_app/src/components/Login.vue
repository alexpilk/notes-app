<template>
    <div class="pt-5">
        <form @submit.prevent="update" method="post">
            <div class="form-group">
                <label for="login">Name</label>
                <input
                        type="text"
                        class="form-control"
                        id="login"
                        v-model="user.login"
                        name="login"
                        placeholder="Enter name">
                <p v-if="errors.login.length">
                <ul data-cy="login-error">
                    <li v-for="error in errors.login" v-bind:key="error.login">{{ error }}</li>
                </ul>
                </p>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="user.password"
                        name="password"
                        placeholder="Enter valid password">
                <p v-if="errors.password.length">
                <ul data-cy="password-error">
                    <li v-for="error in errors.password" v-bind:key="error.password">{{ error }}</li>
                </ul>
                </p>
            </div>
            <p v-if="errors.detail">
            <ul data-cy="general-login-error">
                <li>{{ errors.detail }}</li>
            </ul>
            </p>
            <button type="submit" class="btn btn-primary" data-cy="login">Log in</button>
            <p>Do not have an account?
                <router-link to="/register">Register here.</router-link>
            </p>
        </form>
    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */

    import axios from 'axios';

    export default {
        data() {
            return {
                errors: {
                    detail: null,
                    login: [],
                    password: []
                },
                user: {
                    login: '',
                    password: '',
                },
                submitted: false
            }
        },
        methods: {
            update: function (result) {
                this.submitted = true;
                if (!result) {
                    return;
                }
                axios
                    .post(`http://127.0.0.1:8000/api/accounts/login/`, this.user).then(response => {
                    if (response.status == 400) {
                        this.errors.push(response.data);
                        console.log(this.errors)
                    } else {
                        this.$store.commit('LOGIN_SUCCESS', response.data.token);
                        this.$router.push('/');
                    }
                }).catch(errors => {
                    const fields = errors.response.data;
                    this.errors = {
                        detail: fields.detail,
                        login: fields.login || [],
                        password: fields.password || []
                    };
                    console.log(this.errors)
                })
            }
        },
    }
    /* eslint-enable no-unused-vars */
</script>