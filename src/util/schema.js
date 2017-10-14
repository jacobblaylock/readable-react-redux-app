// This function contains the schemas to be applied to react-jsonschema-form to 
// generate the Add/Edit Post and Comment forms.
export function formSchema(categoryArray) {

  return {

    post: {
      schema: {
        title: "",
        type: "object",
        required: ["categories", "title", "body", "author"],
        properties: {
          title: {title: "Title", type: "string", minLength: 1},
          body: {title: "Body", type: "string", minLength: 1},
          author: {title: "Author", type: "string", minLength: 1},
          categories: {
            title: "Category", 
            type: "string", 
            default: "",
            enum: categoryArray
          }
        }
      },
      ui: {
        "ui:order": ["categories", "title", "body", "author"],
        "ui:rootFieldId": "addPostForm",
        categories: {
          "ui:widget": "select",
          "ui:placeholder": "Select A Category"
        },
        body: {
          "ui:widget": "textarea",
          "ui:placeholder": "Type Comment Here..."
        },
        author: {
          "ui:placeholder": "User"
        }
      }
    },

    comment: {
      schema: {
        title: "Add Comment",
        type: "object",
        required: ["body", "author"],
        properties: {
          body: {title: "Body", type: "string", minLength: 2},
          author: {title: "Author", type: "string", minLength: 2}
        }
      },
      ui: {
        "ui:order": ["body", "author"],
        "ui:rootFieldId": "addCommentForm",
        body: {
          "ui:widget": "textarea",
          "ui:placeholder": "Type Comment Here..."
        },
        author: {
          "ui:placeholder": "User"
        }
      }
    }
  }
}
