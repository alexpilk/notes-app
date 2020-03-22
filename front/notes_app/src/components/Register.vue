<template>
    <div class="pt-5">
        <form @submit.prevent="update" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="user.username"
                        name="name"
                        placeholder="Enter name">
                <ul data-cy="name-error">
                    <li v-for="error in errors.username" v-bind:key="error.username">{{ error }}</li>
                </ul>
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
                <ul data-cy="password-error">
                    <li v-for="error in errors.password" v-bind:key="error.password">{{ error }}</li>
                </ul>
            </div>
            <div class="form-group">
                <label for="password">Password repeat</label>
                <input
                        type="password"
                        class="form-control"
                        id="password_confirm"
                        v-model="user.password_confirm"
                        name="password_confirm"
                        placeholder="Enter valid password">
                <ul data-cy="password-confirm-error">
                    <li v-for="error in errors.password_confirm" v-bind:key="error.password_confirm">{{ error }}</li>
                </ul>
            </div>
            <ul data-cy="non-field-errors">
                <li v-for="error in errors.non_field_errors" v-bind:key="error.non_field_errors">{{ error }}</li>
            </ul>
            <button data-cy="register" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
    /* eslint-disable no-unused-vars */

    import axios from 'axios';

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    password_confirm: '',
                },
                submitted: false,
                errors: {
                    non_field_errors: [],
                    username: [],
                    password: [],
                    password_confirm: []
                },
            }
        },
        methods: {
            update: function (result) {
                this.submitted = true;
                if (!result) {
                    return;
                }
                axios
                    .post(`http://127.0.0.1:8000/api/accounts/register/`,
                        this.user
                    )
                    .then(response => {
                        axios
                            .post(`http://127.0.0.1:8000/api/accounts/login/`,
                                {
                                    login: this.user.username,
                                    password: this.user.password
                                }
                            ).then(response => {
                            this.$store.commit('LOGIN_SUCCESS', response.data.token);
                            this.$router.push('/');
                        })
                    }).catch(errors => {
                    const fields = errors.response.data;
                    this.errors = {
                        non_field_errors: fields.non_field_errors,
                        username: fields.username || [],
                        password: fields.password || [],
                        password_confirm: fields.password_confirm || []
                    };
                    console.log(this.errors)
                })
            }
        },
    }
    /* eslint-enable no-unused-vars */
</script>