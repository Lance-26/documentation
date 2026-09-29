function renderDashboard() {
  document
    .getElementById('dashDate')
    .textContent =
      new Date().toLocaleDateString(
        undefined,
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      );

  const today =
    todayStr();

  const todaysTx =
    DATA.transactions.filter(
      transaction =>
        transaction.dateISO.slice(0, 10) === today &&
        transaction.status === 'completed'
    );

  const todaysRevenue =
    todaysTx.reduce(
      (sum, transaction) =>
        sum + transaction.total,
      0
    );

  const lowStock =
    DATA.products.filter(
      product =>
        product.stock <= product.threshold
    );

  const stats = [

    {
      label: "Today's sales",

      value: fmt(todaysRevenue),

      sub:
        todaysTx.length +
        ' orders'
    },

    {
      label: 'Transactions today',

      value:
        todaysTx.length,

      sub:
        DATA.transactions.length +
        ' all-time'
    },

    {
      label: 'Products tracked',

      value:
        DATA.products.length,

      sub:
        DATA.products.filter(
          product =>
            product.category === 'food'
        ).length +
        ' food · ' +

        DATA.products.filter(
          product =>
            product.category === 'game'
        ).length +
        ' games'
    },

    {
      label: 'Restock alerts',

      value:
        lowStock.length,

      sub:
        lowStock.length
          ? 'needs attention'
          : 'none',

      alert:
        lowStock.length > 0
    }

  ];


  document
    .getElementById('statRow')
    .innerHTML =

      stats
        .map(stat => `

          <div class="stat-card ${
            stat.alert ? 'alert' : ''
          }">

            <div class="label">
              ${stat.label}
            </div>

            <div class="value">
              ${stat.value}
            </div>

            <div class="sub">
              ${stat.sub}
            </div>

          </div>

        `)
        .join('');


  const recent =
    [...DATA.transactions]
      .sort(
        (a, b) =>
          new Date(b.dateISO) -
          new Date(a.dateISO)
      )
      .slice(0, 5);


  document
    .getElementById('dashRecentTx')
    .innerHTML =

      recent.length

        ? recent
            .map(transaction => `

              <tr>

                <td>
                  ${transaction.receiptNo}
                </td>

                <td>
                  ${niceDateTime(
                    transaction.dateISO
                  )}
                </td>

                <td>
                  ${
                    transaction.items.reduce(
                      (sum, item) =>
                        sum + item.qty,
                      0
                    )
                  } item(s)
                </td>

                <td>
                  ${fmt(transaction.total)}
                </td>

                <td>

                  <span
                    class="tag ${
                      transaction.status
                    }"
                  >
                    ${transaction.status}
                  </span>

                </td>

              </tr>

            `)
            .join('')

        : `

          <tr class="empty-row">

            <td colspan="5">
              No transactions yet.
            </td>

          </tr>

        `;

  document
    .getElementById('dashLowStock')
    .innerHTML =

      lowStock.length

        ? lowStock
            .map(product => `

              <tr class="low-stock">

                <td>
                  ${product.name}
                </td>

                <td>
                  ${product.stock} left
                </td>

              </tr>

            `)
            .join('')

        : `

          <tr class="empty-row">

            <td colspan="2">
              Nothing needs restocking.
            </td>

          </tr>

        `;

}
