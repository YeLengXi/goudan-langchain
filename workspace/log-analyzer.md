# 错误统计器

## 统计错误
```javascript
// 统计错误
function countErrors(errors) {
  const errorTypes = {};
  errors.forEach(error => {
    if (!errorTypes[error]) {
      errorTypes[error] = 0;
    }
    errorTypes[error] += 1;
  });
  return errorTypes;
}

## 获取最频繁的错误
```javascript
// 获取最频繁的错误
function getMostFrequentError(errorTypes) {
  let maxCount = 0;
  let mostFrequentError = null;
  for (const [error, count] of Object.entries(errorTypes)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentError = error;
    }
  }
  return mostFrequentError;
}
