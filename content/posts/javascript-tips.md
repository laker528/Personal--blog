---
title: "JavaScript 实用技巧分享"
excerpt: "分享一些在日常开发中非常实用的 JavaScript 技巧和最佳实践。"
date: "2024-01-25"
author: "博主"
tags: ["JavaScript", "技巧", "前端开发"]
category: "技术"
coverImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop"
published: true
---

# JavaScript 实用技巧分享

作为前端开发者，掌握一些 JavaScript 的实用技巧可以大大提高我们的开发效率。今天我想分享一些在日常开发中经常用到的技巧。

## 1. 数组去重

### 使用 Set
```javascript
const uniqueArray = [...new Set(array)];
```

### 使用 filter + indexOf
```javascript
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
```

## 2. 对象深拷贝

### 简单方法（有限制）
```javascript
const deepCopy = JSON.parse(JSON.stringify(obj));
```

### 递归实现
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

## 3. 防抖和节流

### 防抖 (Debounce)
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

### 节流 (Throttle)
```javascript
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}
```

## 4. 异步处理

### Promise.all 的错误处理
```javascript
const results = await Promise.allSettled([
  fetch('/api/data1'),
  fetch('/api/data2'),
  fetch('/api/data3')
]);

const successful = results
  .filter(result => result.status === 'fulfilled')
  .map(result => result.value);
```

### 并发控制
```javascript
async function limitConcurrency(tasks, limit) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}
```

## 5. 实用的数组方法

### 数组分组
```javascript
function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}
```

### 数组分块
```javascript
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

## 6. 性能优化技巧

### 使用 requestAnimationFrame
```javascript
function smoothScroll(element, to, duration) {
  const start = element.scrollTop;
  const change = to - start;
  const startTime = performance.now();
  
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    element.scrollTop = start + change * easeInOutQuad(progress);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  
  requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
```

### 虚拟滚动
```javascript
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    this.startIndex = 0;
    
    this.render();
    this.bindEvents();
  }
  
  render() {
    const visibleItems = this.items.slice(
      this.startIndex,
      this.startIndex + this.visibleCount
    );
    
    this.container.innerHTML = visibleItems
      .map((item, index) => `
        <div style="height: ${this.itemHeight}px; transform: translateY(${(this.startIndex + index) * this.itemHeight}px)">
          ${item}
        </div>
      `)
      .join('');
  }
  
  bindEvents() {
    this.container.addEventListener('scroll', () => {
      const newStartIndex = Math.floor(this.container.scrollTop / this.itemHeight);
      if (newStartIndex !== this.startIndex) {
        this.startIndex = newStartIndex;
        this.render();
      }
    });
  }
}
```

## 总结

这些技巧在日常开发中非常实用，掌握它们可以让我们写出更高效、更优雅的代码。当然，技巧只是工具，最重要的还是要理解背后的原理，这样才能在合适的场景下选择合适的方案。

希望这些技巧对你有帮助！如果你有其他好用的 JavaScript 技巧，欢迎在评论区分享。
