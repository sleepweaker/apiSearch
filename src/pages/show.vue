<template>
    <div class="">
        <div class="searchIn">
            <Row>
                <Col span="3"class="serachInChange">
                API
                </Col>
                <Col span="18">
                <Input size="large"></Input>
                </Col>
                <Col span="3">
                <Button type="primary" icon="ios-search">Search</Button>
                </Col>
            </Row>

        </div>
        <div class="searchShow" style="margin-top:10px">
            <Table :columns="columns10" :data="data9"></Table>
        </div>
    </div>
</template>
<script>
 import expandRow from '../components/table-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data9: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        job: 'Data engineer',
                        interest: 'badminton',
                        birthday: '1991-05-14',
                        book: 'Steve Jobs',
                        movie: 'The Prestige',
                        music: 'I Cry'
                    },
                ]
            }
        },
        methods(){

        }
    }
</script>
<style scoped>
    .searchIn{
        width:40%;
        margin-top: 20px;
    }
    .serachInChange{
        text-align: center;
        height: 32px;
        line-height: 32px;
        font-size: 18px;
        cursor: pointer;
    }
    .showTitle Col{
        height: 50px;
        line-height: 50px;
        text-align: center
    }
</style>

