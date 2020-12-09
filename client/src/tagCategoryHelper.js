import React from 'react';

//**Sets the drop down options for each category */
export function initializeCategoryOptions(categoryWithTagsQuery) {
  const categoryName = categoryWithTagsQuery['categories']
    .replace(')', '')
    .replace('(', '')
    .split(',')[1]
    .replaceAll('"', '');

  const ArrTagData = categoryWithTagsQuery['array_agg']
    .replaceAll('\\"', '')
    .split('"');

  var options = [];

  //parse through the ArrTagData
  //getting the information about each tag in THIS category
  for (let index in ArrTagData) {
    var tagData = ArrTagData[index];

    if (tagData.length > 2) {
      const splitTagData = tagData.split(',');
      const id = parseInt(splitTagData[0].replace('(', ''));
      const name = splitTagData[1];

      options.push(makeCategoryOptions(id, name, categoryName));
    }
  }

  const category = {
    categoryName: categoryName,
    options: options,
    getCategory: _ => category,
    reset: _ => (category['values'] = []),
  };

  return category;
}

function makeCategoryOptions(id, name, categoryName) {
  const categoryOptions = {
    value: name,
    label: name,
    id: id,
    categoryName: categoryName,
  };
  return categoryOptions;
}

function setDefaultCategoryOptions(tags, categories) {
  for (var c in categories) {
    var values = [];

    var category = categories[c];
    const categoryOptions = category['options'];

    for (var t in tags) {
      const tagName = tags[t];
      for (var o in categoryOptions) {
        const tagOption = categoryOptions[o];
        if (tagName === tagOption['value']) {
          values.push(tagOption);
        }
      }
    }
    category['values'] = values;
  }
}
