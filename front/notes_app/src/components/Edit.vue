<template>
    <div class="pt-5">
        <form @submit.prevent="create" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input data-cy="name"
                       type="text"
                       class="form-control"
                       id="name"
                       v-model="note.name"
                       name="name"
                       placeholder="Enter name">
                <ul data-cy="name-error">
                    <li v-for="error in errors.name" v-bind:key="error.name">{{ error }}</li>
                </ul>
            </div>
            <div class="form-group">
                <label for="expiration_date">Expiration date</label>
                <datetime data-cy="expiration_date" id="expiration_date" format="YYYY-MM-DD H:i"
                          v-model='note.expiration_date'></datetime>

                <ul data-cy="date-error">
                    <li v-for="error in errors.expiration_date" v-bind:key="error.expiration_date">{{ error }}</li>
                </ul>
            </div>
            <div class="form-group">

                <label for="text">Text</label>
                <textarea
                        data-cy="text"
                        name="text"
                        class="form-control"
                        id="text"
                        v-model="note.text"
                        cols="30"
                        rows="20"
                        style="resize: vertical; overflow: auto;"></textarea>
                <ul data-cy="text-error">
                    <li v-for="error in errors.text" v-bind:key="error.text">{{ error }}</li>
                </ul>
            </div>
            <button data-cy="submit" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
    import axios from 'axios';
    import datetime from "vuejs-datetimepicker";
    import moment from 'moment';
    import router from "../router";

    export default {
        components: {datetime},
        data() {
            return {
                note: {
                    id: '',
                    name: '',
                    text: '',
                    expiration_date: ''
                },
                submitted: false,
                errors: {}
            }
        },
        mounted() {
            axios.get(`http://127.0.0.1:8000/api/notes/${this.$route.params.id}/`)
                .then(response => {
                    response.data.expiration_date = moment(Date.parse(response.data.expiration_date)).format("YYYY-MM-DD HH:mm");
                    this.note = response.data
                }).catch(errors => {
                alert(errors.response.data.detail);
                router.push('/')
            });
        },
        methods: {
            create: function () {
                axios
                    .patch(`http://127.0.0.1:8000/api/notes/${this.$route.params.id}/`,
                        {
                            name: this.note.name,
                            text: this.note.text,
                            expiration_date: moment(Date.parse(this.note.expiration_date)).utc().format("YYYY-MM-DD HH:mm")
                        }
                    )
                    .then(() => {
                        this.$router.push('/');
                    }).catch(errors => {
                    this.errors = errors.response.data;
                })
            }
        },
    }
</script>