export default {
    resourceFilters: {
        text: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        number: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        checkbox: {
            valueMap: {checked: 'true', unchecked: ''},
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'checkboxType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        select: {
            attributes: {
                label: {class: 'labelType1'},
                inputWrapper: {class: 'selectType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        multipleSelect: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        externalAdmin: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        date: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1', size: 10},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        dateTime: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1', size: 17},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        nestedSelect: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        },
        color: {
            attributes: {
                label: {class: 'labelType1'},
                input: {class: 'inputType1'},
                wrapper: {class: 'inlineInputBlockType1'},
                inputWrapper: {class: 'colorInputType1'}
            }
        },
        other: {
            attributes: {
                label: {class: 'labelType1'},
                wrapper: {class: 'inlineInputBlockType1'}
            }
        }
    },
    resourceEdit: {
        mainRegion: {
            text: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            number: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            textarea: {
                attributes: {
                    input: {
                        class: 'inputType2',
                        rows: 1,
                        autocomplete: 'off',
                        autocorrect: 'off',
                        autocapitalize: 'off',
                        spellcheck: 'false'
                    },
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            html: {
                attributes: {
                    input: {class: 'htmlInputType1'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            htmlComponents: {
                attributes: {
                    input: {class: 'htmlInputType1'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1 htmlComponentsType1'},
                    hint: {class: 'hintType1'}
                }
            },
            date: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            dateTime: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            checkbox: {
                attributes: {
                    input: {class: 'checkboxType1'},
                    label: {class: 'checkboxLabelType1'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            select: {
                attributes: {
                    label: {class: 'labelType2 mod1'},
                    inputWrapper: {class: 'selectType2 fullWidth'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            multipleSelect: {
                attributes: {
                    label: {class: 'labelType2 mod1'},
                    inputWrapper: {},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            externalAdmin: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            includedAdmin: {
                relation: {type: 'hasMany'},
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'includedAdminBlockType1'},
                    inputWrapper: {class: 'includedAdminElement'},
                    hint: {class: 'hintType1'}
                }
            },
            map: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mapElementType1'},
                    hint: {class: 'hintType1'}
                }
            },
            fileAttachment: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'fileAttachment'},
                    hint: {class: 'hintType1'}
                }
            },
            mediaPreview: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaPreviewType1'},
                    hint: {class: 'hintType1'}
                }
            },
            media: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaInputType1'},
                    hint: {class: 'hintType1'}
                }
            },
            nestedSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            code: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'codeInputType1'},
                    hint: {class: 'hintType1'}
                }
            },
            color: {
                attributes: {
                    input: {class: 'inputType2'},
                    label: {class: 'labelType2 mod1'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'colorInputType1'},
                    hint: {class: 'hintType1'}
                }
            },
            other: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            }
        },
        sideRegion: {
            text: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            number: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            textarea: {
                attributes: {
                    input: {
                        class: 'inputType1 fullWidth',
                        rows: 1,
                        autocomplete: 'off',
                        autocorrect: 'off',
                        autocapitalize: 'off',
                        spellcheck: 'false'
                    },
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            date: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            dateTime: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            checkbox: {
                attributes: {
                    input: {class: 'checkboxType1'},
                    label: {class: 'checkboxLabelType1'},
                    wrapper: {class: 'inputBlockType1 sideRegionCheckboxBlock'},
                    hint: {class: 'hintType1'}
                }
            },
            select: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {class: 'selectType1 fullWidth'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            multipleSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    input: {class: 'withOutline'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            stateSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    inputWrapper: {class: 'fullWidth'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            externalAdmin: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            mediaPreview: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaPreviewType1'},
                    hint: {class: 'hintType1'}
                }
            },
            media: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'mediaInputType1'},
                    hint: {class: 'hintType1'}
                }
            },
            nestedSelect: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            },
            color: {
                attributes: {
                    input: {class: 'inputType1 fullWidth'},
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    inputWrapper: {class: 'colorInputType1'},
                    hint: {class: 'hintType1'}
                }
            },
            other: {
                attributes: {
                    label: {class: 'labelType2'},
                    wrapper: {class: 'inputBlockType1'},
                    hint: {class: 'hintType1'}
                }
            }
        }
    }
};
