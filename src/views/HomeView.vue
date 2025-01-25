<template>
  <div class="container">
    <section class="header-wrap">
      <h2>Activity Overview</h2>
    </section>
    <section class="filter-wrap">
      <input type="text" placeholder="請輸入搜尋內容..." />
      <div class="tab-wrap">
        <div class="tab active">all</div>
        <div class="tab">Chatbot</div>
        <div class="tab">It-admin</div>
      </div>
    </section>
    <section class="card-wrap">
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
      <div class="card">
        <h3>10</h3>
        <h5>Created Leads</h5>
        <p>all types</p>
      </div>
    </section>
  </div>
</template>

<script setup></script>
<style scoped lang="scss">
.header-wrap {
  text-align: center;
  padding: 48px 0 24px 0;
  h2 {
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 40px;
  }
}

.filter-wrap {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  margin: 0 2rem 0.5rem 2rem;
  border-bottom: 0.5px solid #e6e6e6;
  input {
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 16px;
    width: 320px;
    background-color: #fbfbfb;
    border: 0.5px solid #e6e6e6;
  }
  .tab-wrap {
    display: flex;
    .tab {
      padding: 7px 8px 2px 8px;
      border: 0.5px solid #e6e6e6;
      border-radius: 10px;
      margin-left: 1rem;
      font-size: 16px;
      &.active {
        background-color: #eff3fc;
        color: #000;
        font-weight: bold;
      }
    }
  }
}

.card-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 500px;
  overflow-y: auto;
  padding: 0 1rem;
}
.card {
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 32px 0;
  margin: 16px;
  width: calc(33.3333% - 32px);
  border: 0.5px solid #e6e6e6;
  border-radius: 10px;
  h3 {
    color: #6272c3;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  h5 {
    font-size: 18px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: #616066;
  }
}
</style>
