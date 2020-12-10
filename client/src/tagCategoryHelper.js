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

  let options = [];

  //parse through the ArrTagData
  //getting the information about each tag in THIS category
  for (let index in ArrTagData) {
    let tagData = ArrTagData[index];

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

export function setDefaultCategoryOptions(tags, categories) {
  for (let c in categories) {
    let values = [];

    let category = categories[c];
    const categoryOptions = category['options'];

    for (let t in tags) {
      const tagName = tags[t];
      for (let o in categoryOptions) {
        const tagOption = categoryOptions[o];
        if (tagName === tagOption['value']) {
          values.push(tagOption);
        }
      }
    }
    category['values'] = values;
  }
}
