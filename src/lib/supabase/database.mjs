"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };

var Database = /** @class */ (function () {
  function Database(supabase) {
    this.supabase = supabase;
    this.get = new QueryManager(this.supabase);
    this.insert = new InsertManager(this.supabase);
  }
  return Database;
})();
var QueryManager = /** @class */ (function () {
  function QueryManager(supabase) {
    var _this = this;
    this.emailLabels = {
      byName: function (name) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [
              2 /*return*/,
              this.supabase
                .from("email_labels")
                .select("*")
                .eq("name", name)
                .single(),
            ];
          });
        });
      },
      all: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [
              2 /*return*/,
              this.supabase.from("email_labels").select("*"),
            ];
          });
        });
      },
    };
    this.serviceAccount = {
      byName: function (params) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  this.supabase
                    .from("service_accounts")
                    .select("*")
                    .eq("name", params.name)
                    .eq("provider", params.provider)
                    .single(),
                ];
              case 1:
                return [2 /*return*/, _a.sent()];
            }
          });
        });
      },
    };
    this.email = {
      byAddress: function (address) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  this.supabase
                    .from("emails")
                    .select("*")
                    .eq("address", address)
                    .single(),
                ];
              case 1:
                return [2 /*return*/, _a.sent()];
            }
          });
        });
      },
    };
    this.emailMessage = {
      ids: {
        all: function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase.from("email_messages").select("id"),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      exists: {
        byId: function (id) {
          return __awaiter(_this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("email_messages")
                      .select("*")
                      .eq("id", id)
                      .single(),
                  ];
                case 1:
                  (_a = _b.sent()), (data = _a.data), (error = _a.error);
                  return [2 /*return*/, !!data && !error];
              }
            });
          });
        },
      },
    };
    this.emailThread = {
      byId: function (id) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  this.supabase
                    .from("email_threads")
                    .select("*")
                    .eq("id", id)
                    .single(),
                ];
              case 1:
                return [2 /*return*/, _a.sent()];
            }
          });
        });
      },
      ids: {
        all: function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase.from("email_threads").select("id"),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      exists: {
        byId: function (id) {
          return __awaiter(_this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("email_threads")
                      .select("*")
                      .eq("id", id)
                      .single(),
                  ];
                case 1:
                  (_a = _b.sent()), (data = _a.data), (error = _a.error);
                  return [2 /*return*/, !!data && !error];
              }
            });
          });
        },
      },
    };
    this.product = {
      backgrounds: {
        all: function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase.from("product_backgrounds").select(),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      slugs: {
        byCountryCode: function (countryCode) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("product_slugs")
                      .select("name, countries(iso_code)")
                      .eq("countries.iso_code", countryCode),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      display: {
        all: function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("products")
                      .select(
                        "id, name, prices:product_prices(amount), images:product_images(url)"
                      )
                      .limit(1, { referencedTable: "prices" })
                      .limit(1),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      detailed: {
        bySlug: function (slug) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("products")
                      .select(
                        "name, id,\n          images:product_images(*),\n          prices:product_prices(amount, size_id),\n          sizes:product_sizes(id, height_cm, height_in, width_cm, width_in),\n          slug:product_slugs!inner(name)"
                      )
                      .limit(1, { referencedTable: "product_slugs" })
                      .order("amount", {
                        referencedTable: "product_prices",
                        ascending: true,
                      })
                      .order("width_cm", {
                        referencedTable: "product_sizes",
                        ascending: true,
                      })
                      .eq("product_slugs.name", slug),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
    };
    this.cart = {
      items: {
        byCartId: function (cartId, count) {
          if (count === void 0) {
            count = false;
          }
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("cart_items")
                      .select(
                        "*, product:products(name, slug:product_slugs(name)),\n              configuration:item_configurations(*,\n                size:product_sizes(\n                width_cm, height_cm, width_in, height_in\n              )\n            )",
                        {
                          count: count ? "exact" : undefined,
                          head: false,
                        }
                      )
                      .limit(1, {
                        referencedTable: "configuration.product_sizes",
                      })
                      .limit(1, { referencedTable: "item_configurations" })
                      .eq("cart_id", cartId),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()]; // Use the foreign key cart_id from cart_items
              }
            });
          });
        },
      },
      item: {
        byId: function (id) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("cart_items")
                      .select("*, configuration:item_configurations(*)")
                      .eq("id", id)
                      .limit(1, { referencedTable: "configuration" })
                      .single(),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
    };
    this.order = {
      summary: {
        _select:
          "*,\n      totals:order_totals(*),\n      payment:order_payments(*),\n      status:order_statuses(*),\n      payment:order_payments(*),\n      billing_address: addresses!orders_billing_address_id_fkey(*),\n      shipping_address: addresses!orders_shipping_address_id_fkey(*)",
        byUserId: function (userId) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("orders")
                      .select(
                        "*,\n            totals:order_totals(*),\n            status:order_statuses(*),\n            payment:order_payments(*),\n            billing_address: addresses!orders_billing_address_id_fkey(*),\n            shipping_address: addresses!orders_shipping_address_id_fkey(*)"
                      )
                      .eq("user_id", userId),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
        all: function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("orders")
                      .select(
                        "*,\n          totals:order_totals(*),\n          status:order_statuses(*),\n          payment:order_payments(*),\n          billing_address: addresses!orders_billing_address_id_fkey(*),\n          shipping_address: addresses!orders_shipping_address_id_fkey(*)"
                      ),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
      detailed: {
        byId: function (orderId) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    this.supabase
                      .from("orders")
                      .select(
                        "*,\n              billing_address: addresses!orders_billing_address_id_fkey(*),\n              shipping_address: addresses!orders_shipping_address_id_fkey(*),\n              totals: order_totals(*),\n              payment: order_payments(*),\n              status: order_statuses(*),\n              activities: order_activities(*, user: user_profiles(*)),\n              items: order_items(*,\n                totals: order_item_totals(*),\n                product: products(*),\n                configuration: item_configurations(*,\n                  size: product_sizes(*)\n                )\n              )"
                      )
                      .eq("id", orderId)
                      .limit(1, {
                        referencedTable: "order_items.order_item_totals",
                      })
                      .limit(1, {
                        referencedTable: "order_activities.user_profiles",
                      })
                      .single(),
                  ];
                case 1:
                  return [2 /*return*/, _a.sent()];
              }
            });
          });
        },
      },
    };
    this.supabase = supabase;
  }
  return QueryManager;
})();
var InsertManager = /** @class */ (function () {
  function InsertManager(supabase) {
    this.supabase = supabase;
  }
  InsertManager.prototype.emailMessagesLabels = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("email_messages_labels")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting email messages label:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.emailLabel = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("email_labels")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              throw new ErrorCode({
                message: error.message || "Unknown error occurred",
                code: error.code,
              });
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.emailThread = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("email_threads")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              throw new ErrorCode({
                message: error.message || "Unknown error occurred",
                code: error.code,
              });
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.emailMessages = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase.from("email_messages").insert(insert).select("id"),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              throw new ErrorCode({
                message: error.message || "Unknown error occurred",
                code: error.code,
              });
            }
            return [
              2 /*return*/,
              data.map(function (d) {
                return d.id;
              }),
            ];
        }
      });
    });
  };
  InsertManager.prototype.emailMessage = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("email_messages")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              throw new ErrorCode({
                message: error.message || "Unknown error occurred",
                code: error.code,
              });
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.email = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase.from("emails").insert(insert).select("id").single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting email:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.itemConfiguration = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("item_configurations")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting item configuration:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.cartItem = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("cart_items")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting cart item:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.cart = function (userId) {
    if (userId === void 0) {
      userId = undefined;
    }
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("carts")
                .insert({ user_id: userId || null })
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting cart:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.orderItem = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("order_items")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order item:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.orderItemTotals = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("order_item_totals")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order item totals:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.address = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("addresses")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting address:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.order = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase.from("orders").insert(insert).select("id").single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.orderPayment = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("order_payments")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order payment:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.orderStatus = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("order_statuses")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order status:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.orderTotals = function (insert) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase
                .from("order_totals")
                .insert(insert)
                .select("id")
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error || !data) {
              console.error("Error inserting order totals:", error);
              throw new Error(error.message || "Unknown error occurred");
            }
            return [2 /*return*/, data.id];
        }
      });
    });
  };
  InsertManager.prototype.userMetadata = function (userId, newMetadata) {
    return __awaiter(this, void 0, void 0, function () {
      var error;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.supabase.auth.admin.updateUserById(userId, {
                user_metadata: newMetadata,
              }),
            ];
          case 1:
            error = _a.sent().error;
            if (error) {
              console.error("Error updatinsg user metadata:", error.message);
              throw new Error(error.message);
            }
            console.log("User metadata updated successfully");
            return [2 /*return*/];
        }
      });
    });
  };
  return InsertManager;
})();

var ErrorCode = /** @class */ (function (_super) {
  __extends(ErrorCode, _super);
  function ErrorCode(params) {
    var _this = _super.call(this, params.message) || this;
    _this.name = "ErrorCode:";
    _this.code = params.code;
    return _this;
  }
  return ErrorCode;
})(Error);

export default Database;
// import { SupabaseClient } from '@supabase/supabase-js';
// import { Database as DbTypes } from './database.types';
// import { QueryData } from '@supabase/supabase-js';
// type QueryType<T extends (...args: any) => any> = QueryData<ReturnType<T>>;
// type DbTables = DbTypes['public']['Tables'];
// export type Supabase = SupabaseClient<DbTypes>;
// class Database {
//   private supabase: Supabase;
//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//     this.get = new QueryManager(this.supabase);
//     this.insert = new InsertManager(this.supabase);
//   }
//   get: QueryManager;
//   insert: InsertManager;
// }
// class QueryManager {
//   private supabase: SupabaseClient<DbTypes>;
//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//   }
//   product = {
//     backgrounds: {
//       all: async () => {
//         return await this.supabase.from('product_backgrounds').select();
//       },
//     },
//     slugs: {
//       byCountryCode: async (countryCode: string) => {
//         return await this.supabase
//           .from('product_slugs')
//           .select(`name, countries(iso_code)`)
//           .eq('countries.iso_code', countryCode);
//       },
//     },
//     display: {
//       all: async () => {
//         return await this.supabase
//           .from('products')
//           .select(
//             'id, name, prices:product_prices(amount), images:product_images(url)'
//           )
//           .limit(1, { referencedTable: 'prices' })
//           .limit(1);
//       },
//     },
//     detailed: {
//       bySlug: async (slug: string) => {
//         return await this.supabase
//           .from('products')
//           .select(
//             `name, id,
//           images:product_images(*),
//           prices:product_prices(amount, size_id),
//           sizes:product_sizes(id, height_cm, height_in, width_cm, width_in),
//           slug:product_slugs!inner(name)`
//           )
//           .limit(1, { referencedTable: 'product_slugs' })
//           .order('amount', {
//             referencedTable: 'product_prices',
//             ascending: true,
//           })
//           .order('width_cm', {
//             referencedTable: 'product_sizes',
//             ascending: true,
//           })
//           .eq('product_slugs.name', slug);
//       },
//     },
//   };
//   cart = {
//     items: {
//       byCartId: async (cartId: string, count: boolean = false) => {
//         return await this.supabase
//           .from('cart_items')
//           .select(
//             `*, product:products(name, slug:product_slugs(name)),
//               configuration:item_configurations(*,
//                 size:product_sizes(
//                 width_cm, height_cm, width_in, height_in
//               )
//             )`,
//             {
//               count: count ? 'exact' : undefined,
//               head: false,
//             }
//           )
//           .limit(1, { referencedTable: 'configuration.product_sizes' })
//           .limit(1, { referencedTable: 'item_configurations' })
//           .eq('cart_id', cartId); // Use the foreign key cart_id from cart_items
//       },
//     },
//     item: {
//       byId: async (id: string) => {
//         return await this.supabase
//           .from('cart_items')
//           .select(`*, configuration:item_configurations(*)`)
//           .eq('id', id)
//           .limit(1, { referencedTable: 'configuration' })
//           .single();
//       },
//     },
//   };
//   order = {
//     summary: {
//       byUserId: async (userId: string) => {
//         return await this.supabase
//           .from('orders')
//           .select('*, totals:order_totals(*), payment:order_payments(*)')
//           .eq('user_id', userId);
//       },
//       all: async () => {
//         return await this.supabase
//           .from('orders')
//           .select('*, totals:order_totals(*), payment:order_payments(*)');
//       },
//     },
//     detailed: {
//       byId: async (orderId: string) => {
//         return await this.supabase
//           .from('orders')
//           .select(
//             `*,
//               billing_address: addresses!orders_billing_address_id_fkey(*),
//               shipping_address: addresses!orders_shipping_address_id_fkey(*),
//               totals: order_totals(*),
//               payment: order_payments(*),
//               status: order_statuses(*),
//               items: order_items(*,
//                 totals: order_item_totals(*),
//                 product: products(*),
//                 configuration: item_configurations(*,
//                   size: product_sizes(*)
//                 )
//               )`
//           )
//           .eq('id', orderId)
//           .limit(1, { referencedTable: 'order_items.order_item_totals' })
//           .single();
//       },
//     },
//   };
// }
// export type OrderDetailedType = QueryType<
//   QueryManager['order']['detailed']['byId']
// >;
// export type ProductsDisplayType = QueryType<
//   QueryManager['product']['display']['all']
// >;
// export type ProductSlugsType = QueryType<
//   QueryManager['product']['slugs']['byCountryCode']
// >[0];
// export type ConfigurableProduct = QueryType<
//   QueryManager['product']['detailed']['bySlug']
// >[0] & {
//   backgrounds: QueryType<QueryManager['product']['backgrounds']['all']>;
//   price?: number | null;
//   cartItemId?: string | null;
// };
// export type CartItemsType = QueryType<
//   QueryManager['cart']['items']['byCartId']
// >;
// export type CartItemType = QueryType<QueryManager['cart']['item']['byId']>;
// export type OrdersSummaryType = QueryType<
//   QueryManager['order']['summary']['all']
// >;
// class InsertManager {
//   private supabase: SupabaseClient<DbTypes>;
//   constructor(supabase: SupabaseClient<DbTypes>) {
//     this.supabase = supabase;
//   }
//   async itemConfiguration(insert: DbTables['item_configurations']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('item_configurations')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting item configuration:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async cartItem(insert: DbTables['cart_items']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('cart_items')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting cart item:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async cart(userId: string | undefined = undefined) {
//     const { data, error } = await this.supabase
//       .from('carts')
//       .insert({ user_id: userId || null })
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting cart:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async orderItem(insert: DbTables['order_items']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_items')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order item:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async orderItemTotals(insert: DbTables['order_item_totals']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_item_totals')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order item totals:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async address(insert: DbTables['addresses']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('addresses')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting address:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async order(insert: DbTables['orders']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('orders')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async orderPayment(insert: DbTables['order_payments']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_payments')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order payment:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async orderStatus(insert: DbTables['order_statuses']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_statuses')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order status:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async orderTotals(insert: DbTables['order_totals']['Insert']) {
//     const { data, error } = await this.supabase
//       .from('order_totals')
//       .insert(insert)
//       .select('id')
//       .single();
//     if (error || !data) {
//       console.error('Error inserting order totals:', error);
//       throw new Error(error.message || 'Unknown error occurred');
//     }
//     return data.id;
//   }
//   async userMetadata(userId: string, newMetadata: object) {
//     const { error } = await this.supabase.auth.admin.updateUserById(userId, {
//       user_metadata: newMetadata,
//     });
//     if (error) {
//       console.error('Error updatinsg user metadata:', error.message);
//       throw new Error(error.message);
//     }
//     console.log('User metadata updated successfully');
//   }
// }
// export default Database;
