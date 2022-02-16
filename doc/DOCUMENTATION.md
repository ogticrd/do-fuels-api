# DO Fuels prices API RESTful

This API RESTful exposes the prices of the Dominican Republic provided fuels by the MICM.

## Open Endpoints

Open endpoints require no Authentication.

## Fuels prices: ``/v1/fuels``

* **Prices** : `GET /v1/fuels`

## Endpoints description

### Regions

#### Endpoint

``/v1/fuels``

#### Params description

| Params | Description |
| --- | --- |
| `date` | Price effective date. This parameter allows a search through the effective price date. |
| `since` | Since price effective date. This parameter allows a search through the effective price date. |
| `until` | Until price effective date. This parameter allows a search through the effective price date. |
| `code` | Fuel code. This parameter allows a search through the fuel code |

#### Example

Request:

```sh
curl -X 'GET' \
  'https://api.digital.gob.do/v1/fuels?date=2021-12-12' \
  -H 'accept: application/json'
```

Response:

```json
{
  "valid": true,
  "meta": {
    "source": "https://micm.gob.do",
    "updatedAt": "2021-12-10T00:00:00.000Z",
    "week": 49,
    "year": 2021
  },
  "data": [
    {
      "id": 14131,
      "name": "Gasolina Premium",
      "code": "PGACU00",
      "currency": "DOP",
      "price": "270.10",
      "date": "2021-12-11"
    },
    ...
  ]
}
```
