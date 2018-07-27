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
        <div class="searchShow">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
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

