import 'dart:convert';
import 'package:http/http.dart' as http;

class DbMaster {
  final String baseUrl = 'http://localhost:3000/master';

  Future<List<dynamic>> getMasters() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load masters');
    }
  }

  Future<dynamic> getMasterById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('Master not found');
    } else {
      throw Exception('Failed to load master');
    }
  }

  Future<void> createMaster(
    String name,
    String email,
    String password,
    int idClass,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'name': name,
        'email': email,
        'password': password,
        'idClass': idClass,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Falha ao criar o master');
    }
  }

  Future<void> updateMaster(
    int id,
    String name,
    String email,
    String password,
    int idClass,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'name': name,
        'email': email,
        'password': password,
        'idClass': idClass,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar o master');
    }
  }

  Future<void> deleteMaster(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Falha ao deletar o master');
    }
  }
}
