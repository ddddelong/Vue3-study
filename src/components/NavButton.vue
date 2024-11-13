<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: false,
    default: '按钮'
  },
  color: {
    type: String,
    required: false,
    default: '#00afee'
  }
})
</script>

<template>
  <div class="btn-animate btn-animate__surround" :style="{'--button-bg': color}">
    <span>
       {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.btn-animate {
  position: relative;
  width: 130px;
  height: 40px;
  line-height: 40px;
  border: none;
  border-radius: 20px;
  background: var(--button-bg, #00afee);
  color: #fff;
  text-align: center;
  cursor: pointer;
}


.btn-animate__surround {
  &::before, &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    background: var(--button-bg, #00afee);
    transition: all 0.3s ease;
  }

  &::before {
    height: 0%;
    width: 2px;
  }

  &::after {
    width: 0%;
    height: 2px;
  }

  &:hover {
    background: transparent;

    &::before {
      height: 100%;
    }

    &::after {
      width: 100%;
    }
  }

  & > span {
    display: block;

    &:hover {
      color: var(--button-bg, #00afee);

      &::before {
        height: 100%;
      }

      &::after {
        width: 100%;
      }
    }

    &::before, &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      background: var(--button-bg, #00afee);
      transition: all 0.3s ease;
    }

    &:before {
      width: 2px;
      height: 0%;
    }

    &:after {
      width: 0%;
      height: 2px;
    }
  }
}
</style>