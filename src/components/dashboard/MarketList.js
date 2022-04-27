import React from 'react'

function MarketList({ key, last, price_change_percent, high, low, volume }) {
    return (
        <tr>
            <td>
                {key}
            </td>

            <td>{last}</td>
            <td>{price_change_percent}</td>
            <td>{high}</td>
            <td>
                {low}
            </td>
            <td>
                {volume}
            </td>
        </tr>
    )
}

export default MarketList